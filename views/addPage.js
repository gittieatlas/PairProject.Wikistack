const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki">

    <div class="form-group">
      <label for="authorName" class="col-sm-3 control-label">Author Name</label>
      <div class="col-sm-9">
        <input id="authorName" name="authorName" type="text" class="form-control"/>
      </div>
    </div>

    <div class="form-group">
      <label for="authorEmail" class="col-sm-3 control-label">Author Email</label>
      <div class="col-sm-9">
        <input id="authorEmail" name="authorEmail" type="text" class="form-control"/>
      </div>
    </div>

    <div class="form-group">
      <label for="pageTitle" class="col-sm-3 control-label">Page Title</label>
      <div class="col-sm-9">
        <input id="pageTitle" name="pageTitle" type="text" class="form-control"/>
      </div>
    </div>

    <div class="form-group">
      <label for="pageContent" class="col-sm-3 control-label">Page Content</label>
      <div class="col-sm-9">
        <textarea id="pageContent" name="pageContent"class="form-control"/>
        </textarea>
      </div>
    </div>

    <fieldset class="form-group">
      <label for="status" class="col-sm-3 control-label">Select a Page Status</label>
      <div class="col-sm-3 form-radio">
        <input type="radio" id="draft" name="status" class="custom-control-input" value="draft"/>
        <label for="draft" class="custom-control-label">Draft</label>
      </div>
      <div class="col-sm-3 form-radio">
        <input type="radio" id="active" name="status" class="custom-control-input" value="active"/>
        <label for="active" class="custom-control-label">Active</label>
      </div>
    </fieldset>

    <div class="col-sm-offset-2 col-sm-9">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>

  </form>
`);
