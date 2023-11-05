package com.example.logger.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class LoggerController {
  private static final Logger log = LoggerFactory.getLogger(LoggerController.class);

  @RequestMapping(value = "/log")
  public String writeLog(@RequestBody String content) {
    log.info(content);
    return "OK";
  }
}
