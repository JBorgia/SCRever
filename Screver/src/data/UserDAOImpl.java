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

package data;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import entities.Log;
import entities.User;

@Transactional
public class UserDAOImpl implements UserDAO {
	@PersistenceContext
	private EntityManager em;

	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	public List<User> index() {
		String query = "Select u from User u";
		return em.createQuery(query, User.class).getResultList();
	}

	public User show(int id) {
		try {
			return em.find(User.class, id);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public User create(User user) {
		User newUser = user;
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		em.persist(user);
		em.flush();

		return em.find(User.class, user.getId());
	}

	public User update(User user) {
		User updateUser = em.find(User.class, user.getId());
		if (user.getUsername() != null) {
			updateUser.setUsername(user.getUsername());
		}
		if (user.getPassword() != null) {
			updateUser.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		em.persist(user);
		em.flush();

		return em.find(User.class, user.getId());
	}

	public Boolean delete(int id) {
		User deleteUser = em.find(User.class, id);
		try {
			em.remove(deleteUser);
			em.flush();
			return true;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return false;
		}
	}

	@Override
	public Set<Log> showLogs(int id) {
		User user = em.find(User.class, id);
		return user.getLogs();
	}
}
