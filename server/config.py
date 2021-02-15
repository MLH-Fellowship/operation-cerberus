import os
# basedir = os.path.abspath(os.path.dirname(__file__))

"""
    - Useful for separating the config environments for different setups (local, staging, production)
        - E.G. you might want to connect to different DB's, different AWS keys, etc.
    
"""

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'needs-to-be-changed'

class ProductionConfig(Config):
    DEBUG = False

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True

class TestingConfig(Config):
    TESTING = True