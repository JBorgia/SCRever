package entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String fname;
	private String lname;
	private String username;
	private String password;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	@JsonManagedReference(value = "userLog")
	private Set<Log> logs;

	public User() {
	}

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public Set<Log> getLogs() {
		return logs;
	}

	public void setScores(Set<Log> logs) {
		this.logs = logs;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public void setLogs(Set<Log> logs) {
		this.logs = logs;
	}

	public void setId(int id) {
		this.id = id;
	}
}
