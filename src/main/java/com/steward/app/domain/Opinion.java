package com.steward.app.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Opinion.
 */
@Entity
@Table(name = "opinion")
public class Opinion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private Mechanic mechanic;

    @ManyToOne
    private Buyer buyer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Mechanic getMechanic() {
        return mechanic;
    }

    public Opinion mechanic(Mechanic mechanic) {
        this.mechanic = mechanic;
        return this;
    }

    public void setMechanic(Mechanic mechanic) {
        this.mechanic = mechanic;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public Opinion buyer(Buyer buyer) {
        this.buyer = buyer;
        return this;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Opinion opinion = (Opinion) o;
        if (opinion.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, opinion.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Opinion{" +
            "id=" + id +
            '}';
    }
}
