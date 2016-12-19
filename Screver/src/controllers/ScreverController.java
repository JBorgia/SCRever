package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.ScreverDAO;
import entities.Log;

@RestController
public class ScreverController {

	@Autowired
	private ScreverDAO screverDAO;

	@RequestMapping(path = "log", method = RequestMethod.GET)
	public List<Log> index() {
		return screverDAO.index();
	}

	@RequestMapping(path = "log/{id}", method = RequestMethod.GET)
	public Log show(@PathVariable int id) {
		return screverDAO.show(id);
	}

	@RequestMapping(path = "log/{id}", method = RequestMethod.DELETE)
	public boolean delete(@PathVariable int id) {
		return screverDAO.delete(id);
	}

	@RequestMapping(path = "log", method = RequestMethod.POST)
	public Log create(@RequestBody String jsonLog) {
		ObjectMapper mapper = new ObjectMapper();
		Log newLog = null;
		try {
			newLog = mapper.readValue(jsonLog, Log.class);
			System.out.println(jsonLog);
			System.out.println(newLog);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return screverDAO.create(newLog);
	}
}
