package entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Entry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "time_stamp")
	private Date timeStamp;
	@ManyToOne
	@JoinColumn(name = "log_id")
	@JsonBackReference(value = "logEntry")
	private Log log;
	@Column(name = "entry")
	private String entryText;

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	public Log getLog() {
		return log;
	}

	public void setLog(Log log) {
		this.log = log;
	}

	public String getEntryText() {
		return entryText;
	}

	public void setEntryText(String entryText) {
		this.entryText = entryText;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Entry [id=" + id + ", timeStamp=" + timeStamp + ", log=" + log.getId() + ", entryText=" + entryText + "]";
	}
}
