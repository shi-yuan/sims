@rem ===================================
@rem execute application
@rem ===================================
set GRADLE_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005 -Xms256m -Xmx512m -XX:MaxPermSize=512m -Dfile.encoding=UTF-8
call gradle jettyRun
pause
