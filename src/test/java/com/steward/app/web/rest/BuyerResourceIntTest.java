package com.steward.app.web.rest;

import com.steward.app.StewardApp;

import com.steward.app.domain.Buyer;
import com.steward.app.repository.BuyerRepository;
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
 * Test class for the BuyerResource REST controller.
 *
 * @see BuyerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StewardApp.class)
public class BuyerResourceIntTest {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBuyerMockMvc;

    private Buyer buyer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BuyerResource buyerResource = new BuyerResource(buyerRepository);
        this.restBuyerMockMvc = MockMvcBuilders.standaloneSetup(buyerResource)
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
    public static Buyer createEntity(EntityManager em) {
        Buyer buyer = new Buyer();
        return buyer;
    }

    @Before
    public void initTest() {
        buyer = createEntity(em);
    }

    @Test
    @Transactional
    public void createBuyer() throws Exception {
        int databaseSizeBeforeCreate = buyerRepository.findAll().size();

        // Create the Buyer
        restBuyerMockMvc.perform(post("/api/buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyer)))
            .andExpect(status().isCreated());

        // Validate the Buyer in the database
        List<Buyer> buyerList = buyerRepository.findAll();
        assertThat(buyerList).hasSize(databaseSizeBeforeCreate + 1);
        Buyer testBuyer = buyerList.get(buyerList.size() - 1);
    }

    @Test
    @Transactional
    public void createBuyerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = buyerRepository.findAll().size();

        // Create the Buyer with an existing ID
        buyer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBuyerMockMvc.perform(post("/api/buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyer)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Buyer> buyerList = buyerRepository.findAll();
        assertThat(buyerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBuyers() throws Exception {
        // Initialize the database
        buyerRepository.saveAndFlush(buyer);

        // Get all the buyerList
        restBuyerMockMvc.perform(get("/api/buyers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buyer.getId().intValue())));
    }

    @Test
    @Transactional
    public void getBuyer() throws Exception {
        // Initialize the database
        buyerRepository.saveAndFlush(buyer);

        // Get the buyer
        restBuyerMockMvc.perform(get("/api/buyers/{id}", buyer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(buyer.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBuyer() throws Exception {
        // Get the buyer
        restBuyerMockMvc.perform(get("/api/buyers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBuyer() throws Exception {
        // Initialize the database
        buyerRepository.saveAndFlush(buyer);
        int databaseSizeBeforeUpdate = buyerRepository.findAll().size();

        // Update the buyer
        Buyer updatedBuyer = buyerRepository.findOne(buyer.getId());

        restBuyerMockMvc.perform(put("/api/buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBuyer)))
            .andExpect(status().isOk());

        // Validate the Buyer in the database
        List<Buyer> buyerList = buyerRepository.findAll();
        assertThat(buyerList).hasSize(databaseSizeBeforeUpdate);
        Buyer testBuyer = buyerList.get(buyerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingBuyer() throws Exception {
        int databaseSizeBeforeUpdate = buyerRepository.findAll().size();

        // Create the Buyer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBuyerMockMvc.perform(put("/api/buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyer)))
            .andExpect(status().isCreated());

        // Validate the Buyer in the database
        List<Buyer> buyerList = buyerRepository.findAll();
        assertThat(buyerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBuyer() throws Exception {
        // Initialize the database
        buyerRepository.saveAndFlush(buyer);
        int databaseSizeBeforeDelete = buyerRepository.findAll().size();

        // Get the buyer
        restBuyerMockMvc.perform(delete("/api/buyers/{id}", buyer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Buyer> buyerList = buyerRepository.findAll();
        assertThat(buyerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Buyer.class);
    }
}
