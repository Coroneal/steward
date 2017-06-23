package com.steward.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Mechanic.
 */
@Entity
@Table(name = "mechanic")
public class Mechanic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "mechanic")
    @JsonIgnore
    private Set<Opinion> opinions = new HashSet<>();

    @OneToMany(mappedBy = "mechanic")
    @JsonIgnore
    private Set<Message> messages = new HashSet<>();

    @OneToMany(mappedBy = "mechanic")
    @JsonIgnore
    private Set<Deal> deals = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public Mechanic user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Opinion> getOpinions() {
        return opinions;
    }

    public Mechanic opinions(Set<Opinion> opinions) {
        this.opinions = opinions;
        return this;
    }

    public Mechanic addOpinion(Opinion opinion) {
        this.opinions.add(opinion);
        opinion.setMechanic(this);
        return this;
    }

    public Mechanic removeOpinion(Opinion opinion) {
        this.opinions.remove(opinion);
        opinion.setMechanic(null);
        return this;
    }

    public void setOpinions(Set<Opinion> opinions) {
        this.opinions = opinions;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Mechanic messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Mechanic addMessage(Message message) {
        this.messages.add(message);
        message.setMechanic(this);
        return this;
    }

    public Mechanic removeMessage(Message message) {
        this.messages.remove(message);
        message.setMechanic(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<Deal> getDeals() {
        return deals;
    }

    public Mechanic deals(Set<Deal> deals) {
        this.deals = deals;
        return this;
    }

    public Mechanic addDeal(Deal deal) {
        this.deals.add(deal);
        deal.setMechanic(this);
        return this;
    }

    public Mechanic removeDeal(Deal deal) {
        this.deals.remove(deal);
        deal.setMechanic(null);
        return this;
    }

    public void setDeals(Set<Deal> deals) {
        this.deals = deals;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mechanic mechanic = (Mechanic) o;
        if (mechanic.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, mechanic.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Mechanic{" +
            "id=" + id +
            '}';
    }
}
