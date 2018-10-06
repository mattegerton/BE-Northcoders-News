
### Routes


```http
GET /api
```

Serves an HTML page with documentation for all the available endpoints

```http
GET /api/topics
```

Get all the topics

```http
GET /api/topics/:topic_slug/articles
```

Return all the articles for a certain topic, e.g: `/api/topics/football/articles`

```http
POST /api/topics/:topic_slug/articles
```

Add a new article to a topic. This route requires a JSON body with title and body key value pairs
e.g: `{ "title": "new article", "body": "This is my new article content"}`

```http
GET /api/articles
```

Returns all the articles

```http
GET /api/articles/:article_id
```

Get an individual article

```http
GET /api/articles/:article_id/comments
```

Get all the comments for a individual article

```http
POST /api/articles/:article_id/comments
```

Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs
e.g: `{"body": "This is my new comment", "created_by": <mongo id for a user>}`

```http
PUT /api/articles/:article_id
```

Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: `/api/articles/:article_id?vote=up`

```http
PUT /api/comments/:comment_id
```

Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: `/api/comments/:comment_id?vote=down`

```http
DELETE /api/comments/:comment_id
```

Deletes a comment

```http
GET /api/users/:username
```

e.g: `/api/users/mitch123`

Returns a JSON object with the profile data for the specified user.


