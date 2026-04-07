package com.landmark.properties.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.landmark.properties.entity.Property;
import com.landmark.user.entity.User;

@Repository
public interface PropertyRepository extends JpaRepository<Property,Long>{
 
	public List<Property> findBySeller(User user);
}
