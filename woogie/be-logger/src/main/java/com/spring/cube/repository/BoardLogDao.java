package com.spring.cube.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.cube.model.BoardLog;

@Repository
public class BoardLogDao {
	
//	▼ 변수 ===============================================================

	@Autowired
	private final SqlSession sqlSesstion;

	public BoardLogDao(SqlSession sqlSesstion) {
		this.sqlSesstion = sqlSesstion;
	}
	
	
//	▼ 메소드 ===============================================================
	
	public int insertBoardLog(BoardLog boardLog) {
		return this.sqlSesstion.insert("insertBoardLog", boardLog);
	}
}
