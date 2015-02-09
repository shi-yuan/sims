package com.sims;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 * http://qiita.com/monzou/items/eb5f25ae9b9925d3c63e
 */
public class Main {

    // Resource path pointing to where the WEBROOT is
    private static final String WEBROOT = "src/main/webapp";

    public static void main(String[] args) throws Exception {
        // Create a basic jetty server object that will listen on port 8888.
        // Note that if you set this to port 0 then
        // a randomly available port will be assigned that you can either look
        // in the logs for the port,
        // or programmatically obtain it for use in test cases.
        Server server = new Server(8888);

        // The WebAppContext is the entity that controls the environment in
        // which a web application lives and
        // breathes. In this example the context path is being set to "/" so it
        // is suitable for serving root context
        // requests and then we see it setting the location of the war. A whole
        // host of other configurations are
        // available, ranging from configuring to support annotation scanning in
        // the webapp (through PlusConfiguration) to choosing where the webapp will unpack itself.
        WebAppContext webapp = new WebAppContext();
        webapp.setContextPath("/");
        webapp.setResourceBase(WEBROOT);

        //
        webapp.setInitParameter("org.eclipse.jetty.servlet.Default.useFileMappedBuffer", "false");

        // This webapp will use jsps and jstl. We need to enable the
        // AnnotationConfiguration in order to correctly
        // set up the jsp container
        Configuration.ClassList classlist = Configuration.ClassList.setServerDefault(server);
        classlist.addBefore("org.eclipse.jetty.webapp.JettyWebXmlConfiguration", "org.eclipse.jetty.annotations.AnnotationConfiguration");

        // Set the ContainerIncludeJarPattern so that jetty examines these
        // container-path jars for tlds, web-fragments etc.
        // If you omit the jar that contains the jstl .tlds, the jsp engine will
        // scan for them instead.
        webapp.setAttribute("org.eclipse.jetty.server.webapp.ContainerIncludeJarPattern", ".*/[^/]*servlet-api-[^/]*\\.jar$|.*/javax.servlet.jsp.jstl-.*\\.jar$|.*/[^/]*taglibs.*\\.jar$");

        // A WebAppContext is a ContextHandler as well so it needs to be set to
        // the server so it is aware of where to
        // send the appropriate requests.
        server.setHandler(webapp);

        // Start things up!
        server.start();

        // The use of server.join() the will make the current thread join and
        // wait until the server is done executing.
        // See http://docs.oracle.com/javase/7/docs/api/java/lang/Thread.html#join()
        server.join();
    }
}
