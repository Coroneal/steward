package com.steward.app.repository;

import com.steward.app.domain.Buyer;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Buyer entity.
 */
@SuppressWarnings("unused")
public interface BuyerRepository extends JpaRepository<Buyer,Long> {

}
