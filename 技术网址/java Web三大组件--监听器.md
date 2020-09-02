# **监听器概述**

------

 监听器（Listener）是一种特殊的Servlet技术，它可以监听Web应用的上下文信息、Servlet请求信息和Servlet会话信息，即ServletContext、ServletRequest、HttpSession。并根据不同的情况，在后台调用相应的处理程序。利用监听器对Web应用进行监听和控制，来增强Web应用的事件处理能力。

监听器要用到javax.servlet.jar中的一组监听接口和事件类，根据监听对象的不同，监听器可被划分为3种：

1）ServletContext事件监听器：用于监听应用程序环境对象。

2）HttpSession事件监听器：用于监听用户会话对象。

3）ServletRequest事件监听器：用于监听请求消息对象。

这3种监听器共包含了8个监听接口、6个监听事件类。

| 监听对象       | 监听接口                        | 监听事件类                   |
| -------------- | ------------------------------- | ---------------------------- |
| ServletRequest | ServletRequestListener          | ServletRequestEvent          |
|                | ServletRequestAttributeListener | ServletRequestAttributeEvent |
| HttpSession    | HttpSessionListener             | HttpSessionEvent             |
|                | HttpSessionActivationListener   | HttpSessionEvent             |
|                | HttpSessionAttributeListener    | HttpSessionBindingEvent      |
|                | HttpSessionBindingListener      | HttpSessionBindingEvent      |
| ServletContext | ServletContextListener          | ServletContextEvent          |
|                | ServletContextAttributeListener | ServletContextAttributeEvent |

#  **监听器的启动顺序**

------

1）当有多个监听器时，按各监听器在web.xml中配置的顺序进行先后顺序启动。

2）相较于过滤器、Servlet的启动顺序是：

监听器>过滤器>Servlet

#  **Listener分类**

------

## 监听ServletContext对象（对应jsp内置对象——application对象）

对ServletCOntext对象实现监听，可以监听到ServletContext对象中属性的变化（增删改操作），也可以就监听到ServletContext对象本身的变化（创建和销毁）。常见监听方法：

| 接口名称                        | 接口方法                                                     | 激发条件 |
| ------------------------------- | ------------------------------------------------------------ | -------- |
| ServletContextAttributeListener | public void attributeAdded(ServletContextAttributeEvent scab); | 增加属性 |
|                                 | public void attributeRemoved(ServletContextAttributeEvent scab); | 删除属性 |
|                                 | public void attributeRepalced(ServletContextAttributeEvent scab); | 修改属性 |
| ServletContextListener          | public void contextInitialized(ServletContextEvent sce);     | 创建对象 |
|                                 | public void contextDestroyed(ServletContextEvent sce);       | 销毁对象 |

##  监听会话（HttpSession对象）（对应jsp内置对象——session对象）：

对HttpSession对象实现监听，可以监听到HttpSession对象中属性的变化（增删改操作），也可以就监听到HttpSession对象本身的变化（创建和销毁），以及该对象的状态，还可以监听HttpSession对象是否绑定到该监视器对象上。常见监听方法：

| 接口名称                      | 接口方法                                                   | 激发条件              |
| ----------------------------- | ---------------------------------------------------------- | --------------------- |
| HttpSessionAttributeListener  | public void attributeAdded(HttpSessionBindingEvent se);    | 增加属性              |
|                               | public void attributeRemoved(HttpSessionBindingEvent se);  | 删除属性              |
|                               | public void attributeReplaced(HttpSessionBindingEvent se); | 修改属性              |
| HttpSessionListener           | public void sessionCreated(HttpSessionEvent se);           | 创建对象              |
|                               | public void sessionDestroyed(HttpSessionEvent se);         | 销毁对象              |
| HttpSessionActivationListener | public void sessionDidActivate(HttpSessionEvent se);       | 会话刚被激活          |
|                               | public void sessionWillPssivate(HttpSessionEvent se);      | 会话将要钝化          |
| HttpSessionBindingListener    | public void valueBound(HttpSessionBindingEvent se);        | 调用setAttribute()    |
|                               | public void valueUnbound(HttpSessionBindingEvent se);      | 调用removeAttribute() |

 **注意1：**

活化（Activate）和钝化（Passivate）是Web容器为了更好地利用系统资源或者进行服务器负载平衡等原因而对特定对象采取的措施。

会话对象的钝化是指暂时将会话对象通过序列化的方法存储到硬盘上；

活化与钝化相反，是把硬盘上存储的会话对象重新加载到Web容器中。

Tomcat中的两种钝化管理器：org.apache.catalina.session.StandardManger和org.apache.catalina.session.Persistentmanger

**注意2：**

session的销毁有两种情况：

- session超时，web.xml配置：

```xml
<session-config>
	<session-timeout>120</session-timeout><!--session120分钟后超时销毁-->
</session-config>
```

- 手工使session失效

```java
public void invalidate();//使session失效方法。session.invalidate();
```

##  监听请求（ServletRequest对象）（对应jsp内置对象——request对象）

对ServletRequest对象实现监听，可以监听到ServletRequest对象中属性的变化（增删改操作），也可以就监听到ServletRequest对象本身的变化（创建和销毁）。常见监听方法：

| 接口名称                        | 接口方法                                                     | 激发条件 |
| ------------------------------- | ------------------------------------------------------------ | -------- |
| ServletRequestAttributeListener | public void attributeAdded(ServletRequestAttributeEvent srae); | 增加属性 |
|                                 | public void attributeRemoved(ServletRequestAttributeEvent srae); | 删除属性 |
|                                 | public void attributeReplaced(ServletRequestAttributeEvent srae); | 修改属性 |
| ServletRequestListener          | public void requestInitialized(ServletRequestEvent sre);     | 创建对象 |
|                                 | public void requestDestroyed(ServletRequestEvent sre);       | 销毁对象 |

#  **监听器设计步骤（实例）**

------

 实例：实现在线人数统计。

**创建session对象：**

当一个浏览器第一次访问网站时，服务器会新建一个`HttpSession`对象，并触发`HttpSession`创建事件；

**`HttpSessionListener`监听`session`**

如果注册了`HttpSessionListener`事件监听器，则会调用`HttpSessionListener`事件监听器的`sessionCreated`方法；

相反，当这个浏览器用户注销或访问超时的时候，服务器会销毁相应的`HttpSession`对象，触发`HttpSession`销毁事件，同时调用所注册的`HttpSessionListener`事件监听器的`sessionDestroyed`方法；

这样，只需在`HttpSessionListener`实现类的`sessionCreated`方法中让计数器加1，在`sessionDestroyed`方法中让计数器减1，就可以实现网站在线人数的统计功能。（在参考博客中还有其他方法统计网站在线人数，在此不再赘述）

**实现步骤**

1、创建实现对应接口的监听器类：

```java
package com.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class OnlineListener implements HttpSessionListener {

    //定义静态变量存储在线人数
    private static int onlineCount=0;
    
    @Override
    public void sessionCreated(HttpSessionEvent arg0) {
        onlineCount++;
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent arg0) {
        if(onlineCount>0) onlineCount--;

    }
    
    //自定义一个返回在线人数的方法
    public static int getOnlineCount(){
        return onlineCount;
    }

}
```

2、配置web.xml文件（配置相对简单，只需配置监听器所在的类，无需配置映射地址）

在servlet 3.0版本及更高版本中，可以使用注解的方式将实现了某个监听器接口的类声明为监听器，即在类名上标注`@WebListener`。

```xml
<!-- 配置监听器 -->
<listener>
	<listener-class>com.listener.OnlineListener</listener-class>
</listener>
  
```

3、创建显示在线人数的jsp页面（注意要导入监听器类所在的包）

```jsp
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.listener.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>在线人数显示页面</title>
</head>
<body>
	<h2>当前的在线人数：<%=OnlineListener.getOnlineCount() %></h2>
</body>
</html>
```

然后可用不同浏览器访问这一网址，查看运行结果。
