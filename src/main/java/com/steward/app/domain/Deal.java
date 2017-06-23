package com.steward.app.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Deal.
 */
@Entity
@Table(name = "deal")
public class Deal implements Serializable {

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

    public Deal mechanic(Mechanic mechanic) {
        this.mechanic = mechanic;
        return this;
    }

    public void setMechanic(Mechanic mechanic) {
        this.mechanic = mechanic;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public Deal buyer(Buyer buyer) {
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
        Deal deal = (Deal) o;
        if (deal.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, deal.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Deal{" +
            "id=" + id +
            '}';
    }
}
