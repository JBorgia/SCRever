//INDEX		GET		users#index		/users				yes	RETRIEVE ALL
//SHOW		GET		users#show		/users/{id}			yes RETRIEVE ONE (for both new user and scores)
//NEW		GET		users#new		/users/new			no	
//CREATE	POST	users#create	/users				yes	CREATE ONE
//EDIT		GET		users#edit		/users/{id}/edit	no
//UPDATE	PUT		users#update	/users/{id}			yes UPDATE ONE
//DESTROY	DELETE	users#destroy	/users/{id}			yes DESTROY ONE

//GET 		users
//GET 		users/{id}
//PUT 		users/{id}
//POST		users
//DELETE 	users/{id}
//GET 		users/{id}/scores

package controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.UserDAO;
import entities.Log;
import entities.User;

@RestController
public class UserController {

	@Autowired
	private UserDAO userDAO;

	@RequestMapping(path = "users", method = RequestMethod.GET)
	public List<User> index() {
		return userDAO.index();
	}

	@RequestMapping(path = "users/{id}", method = RequestMethod.GET)
	public User show(@PathVariable int id) {
		return userDAO.show(id);
	}

	@RequestMapping(path = "users", method = RequestMethod.POST)
	public User create(@RequestBody String jsonUser) {
		ObjectMapper mapper = new ObjectMapper();
		User newUser = null;
		try {
			newUser = mapper.readValue(jsonUser, User.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userDAO.create(newUser);
	}

	@RequestMapping(path = "users", method = RequestMethod.PUT)
	public User update(@RequestBody String jsonUser) {
		ObjectMapper mapper = new ObjectMapper();
		User newUser = null;
		try {
			newUser = mapper.readValue(jsonUser, User.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userDAO.update(newUser);
	}

	@RequestMapping(path = "/users/{id}", method = RequestMethod.DELETE)
	public Boolean update(@PathVariable int id) {
		return userDAO.delete(id);
	}

	@RequestMapping(path = "/users/{id}/logs", method = RequestMethod.GET)
	public Set<Log> showScores(@PathVariable int id) {
		return userDAO.showLogs(id);
	}
}
