class ContractsController < ApplicationController
  def show
    @contract = Contract.find( params[:id] )
    @plan = @contract.plan
  end

  def edit
  end

  def update
  end
end
