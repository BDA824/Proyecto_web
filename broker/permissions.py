# permissions.py
from rest_framework.permissions import BasePermission

class HasChangePasswordPermission(BasePermission):
    def has_permission(self, request, view):
        # Verifica si el usuario está autenticado y si intenta cambiar su propia contraseña
        return request.user.is_authenticated and request.user.id == int(view.kwargs.get('id'))
