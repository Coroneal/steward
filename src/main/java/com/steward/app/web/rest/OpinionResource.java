package com.steward.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.steward.app.domain.Opinion;

import com.steward.app.repository.OpinionRepository;
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
 * REST controller for managing Opinion.
 */
@RestController
@RequestMapping("/api")
public class OpinionResource {

    private final Logger log = LoggerFactory.getLogger(OpinionResource.class);

    private static final String ENTITY_NAME = "opinion";
        
    private final OpinionRepository opinionRepository;

    public OpinionResource(OpinionRepository opinionRepository) {
        this.opinionRepository = opinionRepository;
    }

    /**
     * POST  /opinions : Create a new opinion.
     *
     * @param opinion the opinion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new opinion, or with status 400 (Bad Request) if the opinion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/opinions")
    @Timed
    public ResponseEntity<Opinion> createOpinion(@RequestBody Opinion opinion) throws URISyntaxException {
        log.debug("REST request to save Opinion : {}", opinion);
        if (opinion.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new opinion cannot already have an ID")).body(null);
        }
        Opinion result = opinionRepository.save(opinion);
        return ResponseEntity.created(new URI("/api/opinions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /opinions : Updates an existing opinion.
     *
     * @param opinion the opinion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated opinion,
     * or with status 400 (Bad Request) if the opinion is not valid,
     * or with status 500 (Internal Server Error) if the opinion couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/opinions")
    @Timed
    public ResponseEntity<Opinion> updateOpinion(@RequestBody Opinion opinion) throws URISyntaxException {
        log.debug("REST request to update Opinion : {}", opinion);
        if (opinion.getId() == null) {
            return createOpinion(opinion);
        }
        Opinion result = opinionRepository.save(opinion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, opinion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /opinions : get all the opinions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of opinions in body
     */
    @GetMapping("/opinions")
    @Timed
    public List<Opinion> getAllOpinions() {
        log.debug("REST request to get all Opinions");
        List<Opinion> opinions = opinionRepository.findAll();
        return opinions;
    }

    /**
     * GET  /opinions/:id : get the "id" opinion.
     *
     * @param id the id of the opinion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the opinion, or with status 404 (Not Found)
     */
    @GetMapping("/opinions/{id}")
    @Timed
    public ResponseEntity<Opinion> getOpinion(@PathVariable Long id) {
        log.debug("REST request to get Opinion : {}", id);
        Opinion opinion = opinionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(opinion));
    }

    /**
     * DELETE  /opinions/:id : delete the "id" opinion.
     *
     * @param id the id of the opinion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/opinions/{id}")
    @Timed
    public ResponseEntity<Void> deleteOpinion(@PathVariable Long id) {
        log.debug("REST request to delete Opinion : {}", id);
        opinionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
