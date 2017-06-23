package com.steward.app.web.rest;

import com.steward.app.StewardApp;

import com.steward.app.domain.Raport;
import com.steward.app.repository.RaportRepository;
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
 * Test class for the RaportResource REST controller.
 *
 * @see RaportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StewardApp.class)
public class RaportResourceIntTest {

    @Autowired
    private RaportRepository raportRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRaportMockMvc;

    private Raport raport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RaportResource raportResource = new RaportResource(raportRepository);
        this.restRaportMockMvc = MockMvcBuilders.standaloneSetup(raportResource)
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
    public static Raport createEntity(EntityManager em) {
        Raport raport = new Raport();
        return raport;
    }

    @Before
    public void initTest() {
        raport = createEntity(em);
    }

    @Test
    @Transactional
    public void createRaport() throws Exception {
        int databaseSizeBeforeCreate = raportRepository.findAll().size();

        // Create the Raport
        restRaportMockMvc.perform(post("/api/raports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raport)))
            .andExpect(status().isCreated());

        // Validate the Raport in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeCreate + 1);
        Raport testRaport = raportList.get(raportList.size() - 1);
    }

    @Test
    @Transactional
    public void createRaportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = raportRepository.findAll().size();

        // Create the Raport with an existing ID
        raport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRaportMockMvc.perform(post("/api/raports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raport)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRaports() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);

        // Get all the raportList
        restRaportMockMvc.perform(get("/api/raports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(raport.getId().intValue())));
    }

    @Test
    @Transactional
    public void getRaport() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);

        // Get the raport
        restRaportMockMvc.perform(get("/api/raports/{id}", raport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(raport.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRaport() throws Exception {
        // Get the raport
        restRaportMockMvc.perform(get("/api/raports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRaport() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);
        int databaseSizeBeforeUpdate = raportRepository.findAll().size();

        // Update the raport
        Raport updatedRaport = raportRepository.findOne(raport.getId());

        restRaportMockMvc.perform(put("/api/raports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRaport)))
            .andExpect(status().isOk());

        // Validate the Raport in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeUpdate);
        Raport testRaport = raportList.get(raportList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRaport() throws Exception {
        int databaseSizeBeforeUpdate = raportRepository.findAll().size();

        // Create the Raport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRaportMockMvc.perform(put("/api/raports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raport)))
            .andExpect(status().isCreated());

        // Validate the Raport in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRaport() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);
        int databaseSizeBeforeDelete = raportRepository.findAll().size();

        // Get the raport
        restRaportMockMvc.perform(delete("/api/raports/{id}", raport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Raport.class);
    }
}
