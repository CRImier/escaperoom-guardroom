import sys
sys.argv[1:] = ['0.0.0.0','7080']
import web
from time import sleep, time

from pymodbus.server.sync import StartTcpServer
from pymodbus.device import ModbusDeviceIdentification
from pymodbus.datastore import ModbusSequentialDataBlock
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext

import pdb

import threading

register = 0

class GuardPage():
    def GET(self):
        return render.access()

class ServerStream():
    def GET(self): 
        #global register
        web.header("content-type", "text/event-stream; charset=utf-8")
        web.header("Access-Control-Allow-Origin","*")
        while True:
              yield "Event: server-time\n data: {}\n\n".format(time())
              time.sleep(1) 

              """
              received_register = store.getValues(3, 0)[0]
              print(received_register)
              if received_register != register:
                  print("Changed")
                  register = received_register
                  yield "Success"
              sleep(1)
              """

if __name__ == "__main__":
    urls = (
        '/', 'GuardPage',
        '/stream', 'ServerStream'
    )
    store = ModbusSlaveContext(
        di = ModbusSequentialDataBlock(0, [0]*100),
        co = ModbusSequentialDataBlock(0, [0]*100),
        hr = ModbusSequentialDataBlock(0, [0]*100),
        ir = ModbusSequentialDataBlock(0, [0]*100))
    context = ModbusServerContext(slaves=store, single=True)
    identity = ModbusDeviceIdentification()
    def run_server():
        StartTcpServer(context, identity=identity, address=("0.0.0.0", 7070))
    app = web.application(urls, globals())
    render = web.template.render('templates/')
    modbus_thread = threading.Thread(target = run_server)
    app.internalerror = web.debugerror
    modbus_thread.daemon = True
    #modbus_thread.start()
    #pdb.set_trace()
    web.httpserver.runsimple(app.wsgifunc(), ("0.0.0.0", 7080))
