FROM jetadmin/jetbridge
RUN sed -i '21 s/# //g' /packages/jet_bridge_base/jet_bridge_base/permissions.py ## uncomment 21 line
ENTRYPOINT ["/entrypoint.sh"]
