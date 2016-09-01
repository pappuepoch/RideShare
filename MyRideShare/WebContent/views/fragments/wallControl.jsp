 <nav class="navbar navbar-default">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!--<a class="navbar-brand icon-brand fa fa-facebook-square" href="#"></a>-->
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <div class="search">
                <input type="text" class="form-control" placeholder="Search peoples, places and more">
                <span class="fa fa-search"></span>
              </div>
            </div>
          </form>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="LoginController">Home</a></li>
            <!--<li><a href="#" class="fa fa-user" alt="resquest"></a></li>
            <li><a href="#" class="fa fa-comments" alt="inbox"></a></li>-->
            <li><a href="#" class="fa fa-bell" alt="notifications"></a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="editProfile">Profile</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Logout</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Help</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <div class="container">
        
        <div class="col-sm-12">
            <div class="thumbnail thumbnail-grand-profile">
              <img src="resources/img/wall.jpg" style="width:100%;height:300px;background: #675E5E;" alt="Green Life">
              <div class="caption caption-grand-profile">
              </div>
              <ul class="nav nav-pills nav-grand-profile">
                  <li role="presentation" class="active"><a href="views/wall.jsp">Home</a></li>
                  <li role="presentation"><a href="views/location.jsp">Weather</a></li>
                  <li role="presentation"><a href="views/locationpost.jsp">Post</a></li>
  
             
              </ul>
            </div>    
        </div>
        
        <aside class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">Control Panel</div>
                <div class="panel-body">
                
                </div>
            </div>
        </aside>