package com.park24.auth.exception;

public class UserDoesNotExist extends RuntimeException {

    public UserDoesNotExist(String message) {
        super(message);
    }

}
