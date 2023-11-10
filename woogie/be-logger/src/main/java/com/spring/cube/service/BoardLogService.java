package com.spring.cube.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.cube.model.BoardLog;
import com.spring.cube.repository.BoardLogDao;

@Service
public class BoardLogService {
	
//	▼ 변수 ===============================================================

	@Autowired
	private BoardLogDao boardLogDao;
	
	
//	▼ 메소드 ===============================================================
	
	public int insertBoardLog(BoardLog boardLog) {
		return boardLogDao.insertBoardLog(boardLog);
	}
}
