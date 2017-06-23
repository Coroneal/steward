package com.steward.app.repository;

import com.steward.app.domain.Raport;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Raport entity.
 */
@SuppressWarnings("unused")
public interface RaportRepository extends JpaRepository<Raport,Long> {

}
