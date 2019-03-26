
<profiles>    <!--考虑到window 和linux环境 npm命令格式的问题，使用maven的profile实现动态指定命令-->
  <profile>
    <id>window</id>
    <properties>
      <npm>npm.cmd</npm>
    </properties>

    <activation>
      <activeByDefault>true</activeByDefault>
    </activation>

  </profile>
  <profile>
    <id>linux</id>
    <properties>
      <npm>npm</npm>
    </properties>
  </profile>
</profiles>

<plugins>
  <plugin>
    <!-- 利用maven插件执行npm run build命令：-->
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <executions>
      <execution>
        <id>exec-npm-install</id>
        <phase>prepare-package</phase>
        <goals>
          <goal>exec</goal>
        </goals>
        <configuration>
          <executable>${npm}</executable>
          <arguments>
            <argument>install</argument>
          </arguments>
          <workingDirectory>${basedir}/src/main/webapp</workingDirectory>
        </configuration>
      </execution>
      <execution>
        <id>exec-npm-run-build</id>
        <phase>prepare-package</phase>
        <goals>
          <goal>exec</goal>
        </goals>
        <configuration>
          <executable>${npm}</executable>
          <arguments>
            <argument>run</argument>
            <argument>build</argument>
          </arguments>
          <workingDirectory>${basedir}/src/main/webapp</workingDirectory>
        </configuration>
      </execution>
    </executions>
  </plugin>
  <plugin>
      <!-- 利用maven插件用ant进行copy：-->
      <groupId>org.codehaus.gmaven</groupId>
      <artifactId>gmaven-plugin</artifactId>
      <version>1.5</version>
      <executions>
          <execution>
              <id>copy dist</id>
              <phase>compile</phase>
              <goals>
                  <goal>execute</goal>
              </goals>
              <configuration>
                  <source>
                      ant = new AntBuilder();
                      ant.copy(todir: "${basedir}/src/main/webapp/") {
                          fileset(dir: "${basedir}/src/main/webapp/src/dist") {
                              exclude(name: "**/.gitkeep")
                          }
                      }
                  </source>
              </configuration>
          </execution>
      </executions>
  </plugin>
  <plugin>
    <!-- 利用maven插件编war包：-->
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.4</version>
    <extensions>true</extensions>
    <configuration>
      <warSourceExcludes>
        source/**,
        package.json,
        test/**,
        src/**
      </warSourceExcludes>
      <warSourceDirectory>${basedir}/src/main/webapp/</warSourceDirectory>
      <webResources>
        <resource>
          <directory>${basedir}/src/main/webapp</directory>
          <includes>
            <include>WEB-INF/*</include>
          </includes>
        </resource>
      </webResources>
      <failOnMissingWebXml>false</failOnMissingWebXml>
      <packagingExcludes>${war.packagingExcludes}</packagingExcludes>
      <archive>
        <manifestEntries>
          <WebContext-Name>/projectname</WebContext-Name>
        </manifestEntries>
      </archive>
    </configuration>
  </plugin>
</plugins>


