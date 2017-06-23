package com.steward.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.steward.app.domain.Mechanic;

import com.steward.app.repository.MechanicRepository;
import com.steward.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mechanic.
 */
@RestController
@RequestMapping("/api")
public class MechanicResource {

    private final Logger log = LoggerFactory.getLogger(MechanicResource.class);

    private static final String ENTITY_NAME = "mechanic";
        
    private final MechanicRepository mechanicRepository;

    public MechanicResource(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    /**
     * POST  /mechanics : Create a new mechanic.
     *
     * @param mechanic the mechanic to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mechanic, or with status 400 (Bad Request) if the mechanic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mechanics")
    @Timed
    public ResponseEntity<Mechanic> createMechanic(@RequestBody Mechanic mechanic) throws URISyntaxException {
        log.debug("REST request to save Mechanic : {}", mechanic);
        if (mechanic.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mechanic cannot already have an ID")).body(null);
        }
        Mechanic result = mechanicRepository.save(mechanic);
        return ResponseEntity.created(new URI("/api/mechanics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mechanics : Updates an existing mechanic.
     *
     * @param mechanic the mechanic to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mechanic,
     * or with status 400 (Bad Request) if the mechanic is not valid,
     * or with status 500 (Internal Server Error) if the mechanic couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mechanics")
    @Timed
    public ResponseEntity<Mechanic> updateMechanic(@RequestBody Mechanic mechanic) throws URISyntaxException {
        log.debug("REST request to update Mechanic : {}", mechanic);
        if (mechanic.getId() == null) {
            return createMechanic(mechanic);
        }
        Mechanic result = mechanicRepository.save(mechanic);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mechanic.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mechanics : get all the mechanics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mechanics in body
     */
    @GetMapping("/mechanics")
    @Timed
    public List<Mechanic> getAllMechanics() {
        log.debug("REST request to get all Mechanics");
        List<Mechanic> mechanics = mechanicRepository.findAll();
        return mechanics;
    }

    /**
     * GET  /mechanics/:id : get the "id" mechanic.
     *
     * @param id the id of the mechanic to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mechanic, or with status 404 (Not Found)
     */
    @GetMapping("/mechanics/{id}")
    @Timed
    public ResponseEntity<Mechanic> getMechanic(@PathVariable Long id) {
        log.debug("REST request to get Mechanic : {}", id);
        Mechanic mechanic = mechanicRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mechanic));
    }

    /**
     * DELETE  /mechanics/:id : delete the "id" mechanic.
     *
     * @param id the id of the mechanic to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mechanics/{id}")
    @Timed
    public ResponseEntity<Void> deleteMechanic(@PathVariable Long id) {
        log.debug("REST request to delete Mechanic : {}", id);
        mechanicRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
