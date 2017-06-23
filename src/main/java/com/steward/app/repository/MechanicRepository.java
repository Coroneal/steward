package com.steward.app.repository;

import com.steward.app.domain.Mechanic;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Mechanic entity.
 */
@SuppressWarnings("unused")
public interface MechanicRepository extends JpaRepository<Mechanic,Long> {

}
