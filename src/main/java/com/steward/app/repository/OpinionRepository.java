package com.steward.app.repository;

import com.steward.app.domain.Opinion;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Opinion entity.
 */
@SuppressWarnings("unused")
public interface OpinionRepository extends JpaRepository<Opinion,Long> {

}
