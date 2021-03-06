""" Django command to wait for db to initialize and run """

import time
from psycopg2 import OperationalError as Psycopg2OpError
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand

class Command(BaseCommand):

  def handle(self, *args, **kwargs):
    self.stdout.write('Waiting for db ...')
    db_up = False

    while db_up is False:
      try:
        self.check(databases=['default'])
        db_up = True
      except(Psycopg2OpError, OperationalError):
        self.stdout.write('db is unavailable, retrying ...')
        time.sleep(1)
    
    self.stdout.write(self.style.SUCCESS('db is ready!'))
