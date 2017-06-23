package com.steward.app.repository;

import com.steward.app.domain.Deal;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Deal entity.
 */
@SuppressWarnings("unused")
public interface DealRepository extends JpaRepository<Deal,Long> {

}
