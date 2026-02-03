from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Content
from .serializers import ContentSerializer

class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        if not queryset.exists():
            mock_data = [
                {'id': 1, 'title': 'Welcome', 'body': 'Welcome to CMS Platform'},
                {'id': 2, 'title': 'Getting Started', 'body': 'Start creating your content'},
            ]
            return Response(mock_data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
