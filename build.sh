#!/bin/bash

mv ./src/pages/development ./src/pages/_development

if astro build; then
    echo "Build succeeded!"
else
    echo "Build failed!"
fi

mv ./src/pages/_development ./src/pages/development