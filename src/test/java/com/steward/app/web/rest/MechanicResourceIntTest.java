package com.steward.app.web.rest;

import com.steward.app.StewardApp;

import com.steward.app.domain.Mechanic;
import com.steward.app.repository.MechanicRepository;
import com.steward.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MechanicResource REST controller.
 *
 * @see MechanicResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StewardApp.class)
public class MechanicResourceIntTest {

    @Autowired
    private MechanicRepository mechanicRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMechanicMockMvc;

    private Mechanic mechanic;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MechanicResource mechanicResource = new MechanicResource(mechanicRepository);
        this.restMechanicMockMvc = MockMvcBuilders.standaloneSetup(mechanicResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mechanic createEntity(EntityManager em) {
        Mechanic mechanic = new Mechanic();
        return mechanic;
    }

    @Before
    public void initTest() {
        mechanic = createEntity(em);
    }

    @Test
    @Transactional
    public void createMechanic() throws Exception {
        int databaseSizeBeforeCreate = mechanicRepository.findAll().size();

        // Create the Mechanic
        restMechanicMockMvc.perform(post("/api/mechanics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mechanic)))
            .andExpect(status().isCreated());

        // Validate the Mechanic in the database
        List<Mechanic> mechanicList = mechanicRepository.findAll();
        assertThat(mechanicList).hasSize(databaseSizeBeforeCreate + 1);
        Mechanic testMechanic = mechanicList.get(mechanicList.size() - 1);
    }

    @Test
    @Transactional
    public void createMechanicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mechanicRepository.findAll().size();

        // Create the Mechanic with an existing ID
        mechanic.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMechanicMockMvc.perform(post("/api/mechanics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mechanic)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Mechanic> mechanicList = mechanicRepository.findAll();
        assertThat(mechanicList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMechanics() throws Exception {
        // Initialize the database
        mechanicRepository.saveAndFlush(mechanic);

        // Get all the mechanicList
        restMechanicMockMvc.perform(get("/api/mechanics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mechanic.getId().intValue())));
    }

    @Test
    @Transactional
    public void getMechanic() throws Exception {
        // Initialize the database
        mechanicRepository.saveAndFlush(mechanic);

        // Get the mechanic
        restMechanicMockMvc.perform(get("/api/mechanics/{id}", mechanic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mechanic.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMechanic() throws Exception {
        // Get the mechanic
        restMechanicMockMvc.perform(get("/api/mechanics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMechanic() throws Exception {
        // Initialize the database
        mechanicRepository.saveAndFlush(mechanic);
        int databaseSizeBeforeUpdate = mechanicRepository.findAll().size();

        // Update the mechanic
        Mechanic updatedMechanic = mechanicRepository.findOne(mechanic.getId());

        restMechanicMockMvc.perform(put("/api/mechanics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMechanic)))
            .andExpect(status().isOk());

        // Validate the Mechanic in the database
        List<Mechanic> mechanicList = mechanicRepository.findAll();
        assertThat(mechanicList).hasSize(databaseSizeBeforeUpdate);
        Mechanic testMechanic = mechanicList.get(mechanicList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMechanic() throws Exception {
        int databaseSizeBeforeUpdate = mechanicRepository.findAll().size();

        // Create the Mechanic

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMechanicMockMvc.perform(put("/api/mechanics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mechanic)))
            .andExpect(status().isCreated());

        // Validate the Mechanic in the database
        List<Mechanic> mechanicList = mechanicRepository.findAll();
        assertThat(mechanicList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMechanic() throws Exception {
        // Initialize the database
        mechanicRepository.saveAndFlush(mechanic);
        int databaseSizeBeforeDelete = mechanicRepository.findAll().size();

        // Get the mechanic
        restMechanicMockMvc.perform(delete("/api/mechanics/{id}", mechanic.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mechanic> mechanicList = mechanicRepository.findAll();
        assertThat(mechanicList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mechanic.class);
    }
}
