import sys 

from loguru import logger as loguru_logger 

from configs import app_config

class Loggin:
    def __init__(self) -> None:
        debug = configs.DEBUG 
        if debug:
            self.level = "DEBUG"
        else:
            self.level = "INFO"

    def setup_logger(self):
        loguru_logger.remove() 
        loguru_logger.add(sink=sys.stdout, level=self.level)

        return loguru_logger 
    
loggin = Loggin() 
logger = loggin.setup_logger()