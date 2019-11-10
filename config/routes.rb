Rails.application.routes.draw do
  resources :items
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.htm
  root 'products#index'
  resources :products do
    collection do
      match 'search' =>  'search_products#index', via: [:get, :post]
    end
  end
  namespace :api do
    resources :categories, only: :index, defaults: { format: 'json' }
  end
end
