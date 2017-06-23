package com.steward.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Buyer.
 */
@Entity
@Table(name = "buyer")
public class Buyer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "buyer")
    @JsonIgnore
    private Set<Opinion> opinions = new HashSet<>();

    @OneToMany(mappedBy = "buyer")
    @JsonIgnore
    private Set<Message> messages = new HashSet<>();

    @OneToMany(mappedBy = "buyer")
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

    public Buyer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Opinion> getOpinions() {
        return opinions;
    }

    public Buyer opinions(Set<Opinion> opinions) {
        this.opinions = opinions;
        return this;
    }

    public Buyer addOpinion(Opinion opinion) {
        this.opinions.add(opinion);
        opinion.setBuyer(this);
        return this;
    }

    public Buyer removeOpinion(Opinion opinion) {
        this.opinions.remove(opinion);
        opinion.setBuyer(null);
        return this;
    }

    public void setOpinions(Set<Opinion> opinions) {
        this.opinions = opinions;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Buyer messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Buyer addMessage(Message message) {
        this.messages.add(message);
        message.setBuyer(this);
        return this;
    }

    public Buyer removeMessage(Message message) {
        this.messages.remove(message);
        message.setBuyer(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<Deal> getDeals() {
        return deals;
    }

    public Buyer deals(Set<Deal> deals) {
        this.deals = deals;
        return this;
    }

    public Buyer addDeal(Deal deal) {
        this.deals.add(deal);
        deal.setBuyer(this);
        return this;
    }

    public Buyer removeDeal(Deal deal) {
        this.deals.remove(deal);
        deal.setBuyer(null);
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
        Buyer buyer = (Buyer) o;
        if (buyer.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, buyer.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Buyer{" +
            "id=" + id +
            '}';
    }
}
