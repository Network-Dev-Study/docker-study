package com.spring.cube.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.cube.model.BoardLog;
import com.spring.cube.service.BoardLogService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
public class BoardLogController {
//	▼ 변수 ===============================================================

	@Autowired
	private BoardLogService boardLogService;

	private final Logger logger = LogManager.getLogger(BoardLogController.class);
	
//	▼ 메소드 ===============================================================
	
	@RequestMapping(value = "/board/log" ,method = RequestMethod.POST)
	public int insertBoardLog(@RequestBody BoardLog boardLog) {
		logger.info(boardLog);
		return boardLogService.insertBoardLog(boardLog);
	}
}
