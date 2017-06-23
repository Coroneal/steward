package com.steward.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.steward.app.domain.Raport;

import com.steward.app.repository.RaportRepository;
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
 * REST controller for managing Raport.
 */
@RestController
@RequestMapping("/api")
public class RaportResource {

    private final Logger log = LoggerFactory.getLogger(RaportResource.class);

    private static final String ENTITY_NAME = "raport";
        
    private final RaportRepository raportRepository;

    public RaportResource(RaportRepository raportRepository) {
        this.raportRepository = raportRepository;
    }

    /**
     * POST  /raports : Create a new raport.
     *
     * @param raport the raport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new raport, or with status 400 (Bad Request) if the raport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/raports")
    @Timed
    public ResponseEntity<Raport> createRaport(@RequestBody Raport raport) throws URISyntaxException {
        log.debug("REST request to save Raport : {}", raport);
        if (raport.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new raport cannot already have an ID")).body(null);
        }
        Raport result = raportRepository.save(raport);
        return ResponseEntity.created(new URI("/api/raports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /raports : Updates an existing raport.
     *
     * @param raport the raport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated raport,
     * or with status 400 (Bad Request) if the raport is not valid,
     * or with status 500 (Internal Server Error) if the raport couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/raports")
    @Timed
    public ResponseEntity<Raport> updateRaport(@RequestBody Raport raport) throws URISyntaxException {
        log.debug("REST request to update Raport : {}", raport);
        if (raport.getId() == null) {
            return createRaport(raport);
        }
        Raport result = raportRepository.save(raport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, raport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /raports : get all the raports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of raports in body
     */
    @GetMapping("/raports")
    @Timed
    public List<Raport> getAllRaports() {
        log.debug("REST request to get all Raports");
        List<Raport> raports = raportRepository.findAll();
        return raports;
    }

    /**
     * GET  /raports/:id : get the "id" raport.
     *
     * @param id the id of the raport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the raport, or with status 404 (Not Found)
     */
    @GetMapping("/raports/{id}")
    @Timed
    public ResponseEntity<Raport> getRaport(@PathVariable Long id) {
        log.debug("REST request to get Raport : {}", id);
        Raport raport = raportRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(raport));
    }

    /**
     * DELETE  /raports/:id : delete the "id" raport.
     *
     * @param id the id of the raport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/raports/{id}")
    @Timed
    public ResponseEntity<Void> deleteRaport(@PathVariable Long id) {
        log.debug("REST request to delete Raport : {}", id);
        raportRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
