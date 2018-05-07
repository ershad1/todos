package com.example.demo.entity;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:test/test.properties")
@Sql({ "classpath:test/test-data.sql" })
public class TodoIntegrationTest {

    private static final String URL = "/todos/";
    @Autowired
    TestRestTemplate testRestTemplate;

    @Test
    public void getTodoName() {
        // arrange
        // Not required as test-data.sql will insert one record which will
        // be retrieved here

        // act
        ResponseEntity<Todo> responseEntity = testRestTemplate.getForEntity(URL + "{id}", Todo.class, 1L);

        // assert
        Assertions.assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(responseEntity.getBody().getId()).isEqualTo(1L);
    }

    @Test
    public void getTodoNameNotFound() {
        // arrange
        // Not required as test-data.sql will insert one record which will
        // be retrieved here

        // act
        ResponseEntity<Todo> responseEntity = testRestTemplate.getForEntity(URL + "{id}", Todo.class, 100L);

        // assert
        Assertions.assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        Assertions.assertThat(responseEntity.getBody()).isNull();
    }


}