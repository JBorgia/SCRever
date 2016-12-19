package entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Log {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Date date;
	private Date time;
	private int quality;
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference(value = "userLog")
	private User user;
	@OneToMany(mappedBy = "log", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JsonManagedReference(value = "logEntry")
	private Set<Entry> entries;

	public Date getDate() {
		return date;
	}

	public void setDate(Date start) {
		this.date = start;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public int getQuality() {
		return quality;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Entry> getEntries() {
		return entries;
	}

	public void setEntries(Set<Entry> entries) {
		this.entries = entries;
	}

	public int getId() {
		return id;
	}

//	@Override
//	public String toString() {
//		return "Log [id=" + id + ", date=" + date + ", time=" + time + ", quality=" + quality
//				+ ", entries=" + entries.size() + "]";
//	}

}
