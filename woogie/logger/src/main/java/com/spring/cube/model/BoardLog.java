package com.spring.cube.model;


public class BoardLog {

	private int    logId;        // log_id
	private String logContent;   // log_content
	private String creationDate; // creation_date
	
	public BoardLog(int logId, String logContent, String creationDate) {
		super();
		this.logId = logId;
		this.logContent = logContent;
		this.creationDate = creationDate;
	}

	public int getLogId() {
		return logId;
	}

	public void setLogId(int logId) {
		this.logId = logId;
	}

	public String getLogContent() {
		return logContent;
	}

	public void setLogContent(String logContent) {
		this.logContent = logContent;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public String toString() {
		return "BoardLog [logId=" + logId + ", logContent=" + logContent + ", creationDate=" + creationDate + "]";
	}
}
