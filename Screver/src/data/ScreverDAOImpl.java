//INDEX		GET		users#index		/log				yes	RETRIEVE ALL	retrieves all the logzes
//SHOW		GET		users#show		/log/{id}			yes RETRIEVE ONE 	retrieves a specific log by its id
//SHOW		GET		users#show		/log/{id}			yes RETRIEVE ONE 	gets all the scores associated with a log by its id
//CREATE	POST	users#create	/log				yes	CREATE ONE		creates a new log
//DESTROY	DELETE	users#destroy	/log/{id}			yes DESTROY ONE		destroys a post by its id
//POST api/log/{id}/questions and DELETE api/log/{id}/questions/{q_id}

package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import entities.Log;
import entities.User;

@Transactional
@RequestMapping(name = "log")
public class ScreverDAOImpl implements ScreverDAO {
	@PersistenceContext
	private EntityManager em;

	public List<Log> index() {
		String query = "Select l from Log l";
		return em.createQuery(query, Log.class).getResultList();
	}

	public Log show(int id) {
		return em.find(Log.class, id);
	}

	public Log create(Log log) {
		Log newLog = log;
		User temp = em.find(User.class, 1);// temporarily assign all logs to user1.
		System.out.println(newLog);
		newLog.setUser(temp);
		em.persist(newLog);
		em.flush();
		return em.find(Log.class, log.getId());
	}

	public boolean delete(int id) {
		Log deleteLog = em.find(Log.class, id);
		try {
			em.remove(deleteLog);
			em.flush();
			return true;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return false;
		}
	}

}
