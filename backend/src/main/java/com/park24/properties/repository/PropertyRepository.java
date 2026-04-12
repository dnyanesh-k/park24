package com.park24.properties.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.park24.properties.entity.Property;
import com.park24.user.entity.User;

@Repository
public interface PropertyRepository extends JpaRepository<Property,Long>{
 
	public List<Property> findBySeller(User user);
}
