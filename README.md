# ms-messenger

![Dependencies][david-badge]

This service will be a small part of [locator-app.com](https://locator-app.com) 2.0

## Installation

1. `git clone https://github.com/locator-kn/ms-messenger.git`
2. `cd ms-messenger`
3. `npm install`


## Usage

The service itself uses [seneca](http://senecajs.org/) to expose its functionality via pattern.
Its designed for the new locator environment.

At locator we plan a simple microservice architecture which communicates (among others) over [rabbit-mq](https://www.rabbitmq.com/).

### Prerequisites

* node v4
* running rabbitmq-server
* running mongodb instance
* .env file in parent folder.


[david-badge]: https://david-dm.org/locator-kn/ms-messenger.svg