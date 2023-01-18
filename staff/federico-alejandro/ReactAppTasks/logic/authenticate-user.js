/**
 * authenticates a user against DB
 * 
 * @param {string} email the user email.
 * @param {string} password the user password.
 * 
 *  @returns user | Error
 */
function authenticateUser(email, password) {
    if (typeof email !== 'string') throw new Error ('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new Error ('email is not valid')

    if (typeof password !== 'string') throw new Error ('password is not a string')
    if (password.length < 8) throw new Error ('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new Error ('password has spaces')

    const options = {
        body: JSON.stringify({ email, password }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
    
      /* hasta acá es todo síncrono
      en adelante, es asícrono */
    
      return fetch("http://localhost/auth", options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("failed on fetching authentication");
          }
    
          return response.json();
        })
        .then((data) => {
          const { userId } = data;
    
          return userId;
        });
    }