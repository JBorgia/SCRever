package data;

import java.util.List;

import entities.Log;

public interface ScreverDAO {
	public List<Log> index();
	public Log show(int id);
	public boolean delete(int id);
	public Log create(Log log);
}
