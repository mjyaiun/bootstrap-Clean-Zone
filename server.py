# -*- coding:utf-8 -*-
'''
Created on 2017-03-24
server: 建立http服务器
@author: mjyaiun
'''

import tornado.httpserver
import tornado.ioloop
import tornado.web
import os.path
from tornado.options import define, options
from url import url


define("port", default=8000, type=int, help="run on the given port")
define("pageSize", default=20, type=int, help="this is pagination size")

#定义Application信息，它是集成tornado.web.Application的
class Application(tornado.web.Application):
    #__init__函数自动调用
    def __init__(self):
        #这里是url对应的控制器，下面分别对应一个类，来处理里面的逻辑
        handlers = []
        handlers.append((r"/images/(.*)", tornado.web.StaticFileHandler,{"path":"images"}))
        handlers.extend(url)
        #加载模板、文件（css、js）路径
        settings = dict(
                        template_path = os.path.join(os.path.dirname(__file__), "templates"),
                        static_path = os.path.join(os.path.dirname(__file__), "static"),
                        #upload_path = os.path.join(os.path.dirname(__file__), "files"),
                        session_cookie_age = 60*1,
                        session_expire_at_browser_close = True,
                        debug = True
                        )
        #然后调用tornado.web.Application类的__init__函数加载进来
        tornado.web.Application.__init__(self, handlers, **settings)



#应用的入口
if __name__ == "__main__":
    #先设置日志等级为"debug",默认是"info"
    tornado.options.options.logging = "debug"
    tornado.options.parse_command_line()
    #创建一个服务器
    http_server = tornado.httpserver.HTTPServer(Application())
    #监听端口
    http_server.listen(options.port)
    #启动服务
    tornado.ioloop.IOLoop.instance().start()
    
    
    