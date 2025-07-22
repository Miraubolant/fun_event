import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle, FileText } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToQuote?: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onNavigateToQuote }) => {
  const { items, removeFromCart, updateQuantity, updateDuration, clearCart, getTotalPrice } = useCart();

  if (!isOpen) return null;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    
    let message = "🛒 *Commande Fun Event*\n\n";
    
    items.forEach((item, index) => {
      const price = item.duration === '2days' && item.structure.price2Days 
        ? item.structure.price2Days 
        : item.structure.price;
      
      message += `${index + 1}. *${item.structure.name}*\n`;
      message += `   • Quantité: ${item.quantity}\n`;
      message += `   • Durée: ${item.duration === '2days' ? '2 jours' : '1 jour'}\n`;
      message += `   • Prix unitaire: ${price}€\n`;
      message += `   • Sous-total: ${price * item.quantity}€\n\n`;
    });
    
    message += `💰 *Total: ${getTotalPrice()}€*\n\n`;
    message += "Je souhaiterais réserver ces structures. Pouvez-vous me confirmer la disponibilité et les détails de livraison ?";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/33663528072?text=${encodedMessage}`, '_blank');
  };

  const handleGoToQuote = () => {
    if (onNavigateToQuote) {
      onNavigateToQuote();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2 text-orange-500" />
            Mon Panier ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
              <p className="text-gray-600">Ajoutez des structures depuis notre catalogue !</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const price = item.duration === '2days' && item.structure.price2Days 
                  ? item.structure.price2Days 
                  : item.structure.price;
                
                return (
                  <div key={`${item.structure.id}-${item.duration}`} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={item.structure.image} 
                        alt={item.structure.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.structure.name}</h3>
                        <div className="mb-2">
                          <label className="block text-xs text-gray-500 mb-1">Durée:</label>
                          <select
                            value={item.duration}
                            onChange={(e) => updateDuration(item.structure.id, e.target.value as '1day' | '2days')}
                            className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:outline-none w-full"
                          >
                            <option value="1day">1 jour</option>
                            <option value="2days">2 jours</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => updateQuantity(item.structure.id, item.quantity - 1)}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.structure.id, item.quantity + 1)}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-orange-600 text-sm sm:text-base">{price * item.quantity}€</p>
                            <p className="text-xs text-gray-500">{price}€ x {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.structure.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg sm:text-xl font-bold text-gray-900">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-orange-600">{getTotalPrice()}€</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                Vider le panier
              </button>
              <button
                onClick={handleGoToQuote}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Faire un devis
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;