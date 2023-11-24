## Routing with variables:

app.post("/urls", (req, res) => {
  if (req.session.user_id) {
    const newID = generateRandomString();
    urlDatabase[newID] = { longURL: req.body.longURL, userID: req.session.user_id }
    res.redirect(`urls/${newID}`);
  } else {
    return res.status(401).render("error", { errMsg: "You must log in to shorten URLs", statusCode: 401, user: null });
  }
});


## Variables being passed:

  <main style="margin: 1em;">
      <h3>Create TinyURL</h3>
      <form class="form-inline" action="/urls" method="POST">
        <div class="form-group mb-2">
          <label for="longURL">Enter a URL:</label>
          <input
            class="form-control"
            type="text"
            name="longURL"
            placeholder="http://"
            style="width: 300px; margin: 1em"
          />
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </main>


## Generating a table with data from an object:

  <table class="table">
        <thead>
          <tr>
            <th scope="col">Short URL ID</th>
            <th scope="col">Long URL</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete?</th>
          </tr>
        </thead>
        <tbody>
          <% for (let id in urls) { %>
            <tr>
              <td><a href="/u/<%= id %>"><%= id %></a></td>
              <td><%= urls[id] %></td>
              <td>
                <form method="GET" action="urls/<%= id %>" >
                  <input type ="submit" value="Edit" class="button">
                </form>
              </td>
              <td>
                <form method="POST" action="urls/<%= id %>/delete?_method=DELETE" >
                  <input type ="submit" value="Delete" class="button button2">
                </form>
              </td>
            </tr>
          <% } %>
        </tbody>
      </table>

# Vars passed forward for ^^ table:

app.get("/urls", (req, res) => {
  if (req.session.user_id) {
    const user = req.session.user_id;
    const templateVars = { user: users[user], urls: urlsForUser(user, urlDatabase) };
    res.render("urls_index", templateVars);
  } else {
    return res.status(401).render("error", { errMsg: "Please log in to view URLs", statusCode: 401, user: null });
  }
});