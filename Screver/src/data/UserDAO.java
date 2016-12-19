//GET users
//GET users/{id}
//PUT users/{id}
//POST users
//DELETE users/{id}
//GET users/{id}/scores (we will implement this logic later)

package data;

import java.util.List;
import java.util.Set;

import entities.Log;
import entities.User;

public interface UserDAO {

	public List<User> index();
	public User show(int id);
	public User create(User user);
	public User update(User user);
	public Boolean delete(int id);
	public Set<Log> showLogs(int id);
}
